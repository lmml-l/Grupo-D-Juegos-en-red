package es.juegosenred.backend.fightforthehood;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

//Usuarios en partida

@RestController
@RequestMapping("/apodos")
public class ApodosPartida {
	
	@Autowired
	private MyMatch mymatch;
	
	//GET
	@GetMapping("/apodolist/{ip:.+}")
	@ResponseStatus(HttpStatus.CREATED)
	public String getapodo(@PathVariable String ip ){
		return mymatch.getListadeapodos().get(ip);
	}
	
	//DELETE
	@PutMapping("/deletenombre")
	@ResponseStatus(HttpStatus.CREATED)
	public String deleteId(@RequestBody String nombre) {
		mymatch.getNombresenPartida().remove(nombre.substring(1, nombre.length()-1));
		return nombre;
	}
}