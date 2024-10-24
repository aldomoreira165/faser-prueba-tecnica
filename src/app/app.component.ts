import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	tituloTarea: string = '';
	minutosTarea: number = 0;
	ordenAscendente = true;

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	// crear una nueva tarea
	async agregarTarea() {
		const nuevaTarea: Tarea = new Tarea(this.tareas.length + 1, this.tituloTarea, this.minutosTarea);
		this.tareas.push(nuevaTarea);
		this.tituloTarea = '';
		this.minutosTarea = 0;
	}

	// seleccionar una tarea
	async seleccionarTarea(tarea: Tarea) {
		tarea.seleccionada = !tarea.seleccionada;
		console.log(this.tareas)
	}

	// eliminar tareas seleccionadas
	async eliminarTareas() {
		this.tareas = this.tareas.filter(tarea => !tarea.seleccionada);
	}

	// ordenar tareas por campo
	async ordenarTareas(campo: string) {
		this.ordenAscendente = !this.ordenAscendente;
		this.tareas.sort((a, b) => {
			if (a[campo] < b[campo]) return this.ordenAscendente ? -1 : 1;
			if (a[campo] > b[campo]) return this.ordenAscendente ? 1 : -1;
			return 0;
		});
	}

	// destacar tareas seleccionadas
	async marcarDestacadas() {
		this.tareas.forEach(tarea => {
			if (tarea.seleccionada) {
				tarea.destacada = true;
			}
		});
	}

	// ordenar tareas aleatoriamente
	async ordenarAleatorio() {
		this.tareas.sort(() => Math.random() - 0.5);
	}
}
