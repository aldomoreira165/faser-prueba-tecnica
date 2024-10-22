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
}
