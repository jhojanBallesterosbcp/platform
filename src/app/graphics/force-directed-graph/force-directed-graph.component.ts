import { AfterViewInit, Component, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';



@Component({
	selector: 'app-force-directed-graph',
	templateUrl: './force-directed-graph.component.html',
	styleUrls: ['./force-directed-graph.component.scss']
})
export class ForceDirectedGraphComponent implements AfterViewInit {
	simulation: any
	data: any[] = []
	nodes: any[] = []
	links: any[] = []
	constructor(private elementRef: ElementRef, private http: HttpClient) { }

	onInit() {

	}

	ngAfterViewInit() {
		this.loadData().subscribe(data => {
			this.data = data
			this.nodes = data.nodes
			this.links = data.links
			const width = 1000;
			const height = 800;

			const svg = d3.select(this.elementRef.nativeElement)
				.select('.graph-container')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr("viewBox", [0, 0, width, height])
				.attr("style", "max-width: 100%; height: auto;");

			const nodes: any = this.nodes;
			const links = this.links;

			this.simulation = d3.forceSimulation(nodes)
				.force('link', d3.forceLink(links).id((d: any) => d.id))
				.force('charge', d3.forceManyBody().strength(-300))
				.force('center', d3.forceCenter(width / 2, height / 2));


			const link = svg.append("g")
				.attr("stroke", "#999")
				.attr("stroke-opacity", 0.6)
				.selectAll()
				.data(links)
				.join("line")
				.attr("id", d => "line")
				.attr("stroke-width", .4);

			const node = svg.append("g")
				.attr("stroke", "#fff")
				.attr("stroke-width", 1.5)
				.selectAll()
				.data(nodes)
				.join("g")
				.attr("id", d => "node")
				.call(d3.drag()
					.on("start", this.dragstarted.bind(this))
					.on("drag", this.dragged.bind(this))
					.on("end", this.dragended.bind(this)) as any)


			const mentorNodes = node.filter((d: any) => d.Rol === 'Mentor');
			const cohorte1 = node.filter((d: any) => d.Rol === 'Alumni' && d.Cohorte.includes('Cohorte 1'))
			const cohorte2 = node.filter((d: any) => d.Rol === 'Alumni' && d.Cohorte.includes('Cohorte 2'))
			const cohorte3 = node.filter((d: any) => d.Rol === 'Alumni' && d.Cohorte.includes('Cohorte 3'))
			const cohorte4 = node.filter((d: any) => d.Rol === 'Alumni' && d.Cohorte.includes('Cohorte 4'))
			const cohorte5 = node.filter((d: any) => d.Rol === 'Alumni' && d.Cohorte.includes('Cohorte 5'))
			const cohorte6 = node.filter((d: any) => d.Rol === 'Alumni' && d.Cohorte.includes('Cohorte 6'))
			mentorNodes.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#8023d3");
			cohorte1.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#02b1f1");
			cohorte2.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#feff00");
			cohorte3.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#52f1ac");
			cohorte4.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#ff0a00");
			cohorte5.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#ff9050");
			cohorte6.append("circle")
				.attr("r", 19) // Ajusta el radio según el tamaño de la imagen
				.attr("fill", "#00b051");


			node.append("image")
				.attr("xlink:href", (d: any) => d.image_url) // La URL de la imagen
				.attr("x", -15) // Ajusta la posición x de la imagen según tu preferencia
				.attr("y", -15) // Ajusta la posición y de la imagen según tu preferencia
				.attr("width", 30) // Ajusta el ancho de la imagen según tu preferencia
				.attr("height", 30); // Ajusta la altura de la imagen según tu preferencia


			//tooltip



			node.on('mouseover', (d) => {

				const mentorNodes = nodes.filter((node: any) => /*{
						console.log(node)
						console.log(d.target.__data__.id)
					} */ node.Rol === 'Mentor' && node.id === d.target.__data__.id);

				// Verificar si el nodo es un alumno
				const isAlumno = d.target.__data__.Rol?.includes('Alumni');

				// Si es un alumno, no hacer nada
				if (isAlumno) {
					return;
				}

				// Resaltar los nodos de mentores y sus conexiones
				node.style('opacity', (node: any) => {
					const alumni = node.mentorId
					const filterAlumni = alumni?.filter((element: any) => element.toLowerCase() == mentorNodes[0]?.id.toLowerCase())

					if (mentorNodes.includes(node) || filterAlumni) {

						if (filterAlumni?.length == 0) {
							return 0.2
						} else {
							return 1
						}
					} else {
						return 0.2
					}
				})
					.style('stroke-width', 3)

				// Resaltar las conexiones de los nodos de mentores
				link.style('stroke-opacity', link => mentorNodes.includes(link.source) || mentorNodes.includes(link.target) ? 1 : 0.2)
					.style('stroke', link => mentorNodes.includes(link.source) || mentorNodes.includes(link.target) ? '#8023d3' : '#999')
					.style('stroke-width', link => mentorNodes.includes(link.source) || mentorNodes.includes(link.target) ? '1.5px' : '1px');

				// Restaurar la opacidad de los nodos que no están relacionados
				//nodes.filter(node => !mentorNodes.includes(node)).style('opacity', 0.2);

				// Restaurar la opacidad de las conexiones que no están relacionadas
				link.filter(link => !mentorNodes.includes(link.source) && !mentorNodes.includes(link.target)).style('stroke-opacity', 0.2);

			})
				.on('mouseout', d => {
					node.style('opacity', 1)
					link
						.style('stroke', 'grey')
						.style('stroke-opacity', .8)
						.style('stroke-width', '.4')

				})


			this.simulation.on('tick', () => {
				link
					.attr('x1', (d: any) => d.source.x)
					.attr('y1', (d: any) => d.source.y)
					.attr('x2', (d: any) => d.target.x)
					.attr('y2', (d: any) => d.target.y);

				node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
			});
		})

	}
	// Reheat the simulation when drag starts, and fix the subject position.
	dragstarted(event: any) {
		if (!event.active) this.simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	// Update the subject (dragged node) position during drag.
	dragged(event: any) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}

	// Restore the target alpha so the simulation cools after dragging ends.
	// Unfix the subject position now that it’s no longer being dragged.
	dragended(event: any) {
		if (!event.active) this.simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;

	}

	loadData() {
		return this.http.get<any>('./assets/20230926_mentorships_connections.json');
	}

}

