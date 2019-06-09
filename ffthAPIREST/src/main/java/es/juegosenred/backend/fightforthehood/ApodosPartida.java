package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/apodos")
public class ApodosPartida {
	
	@Autowired
	private MyMatch mymatch;
		
	@GetMapping("/apodolist/{ip:.+}")
	@ResponseStatus(HttpStatus.CREATED)
	public String getapodo(@PathVariable String ip ){
		//System.out.println(ip +"deberia existir");
		//System.out.println(mymatch.getListadeapodos().get(ip));
		return mymatch.getListadeapodos().get(ip);
	}
	
	@PutMapping("/deletenombre")
	@ResponseStatus(HttpStatus.CREATED)
	public String deleteId(@RequestBody String nombre) {
		System.out.println("ipquedebeborrar0 " + mymatch.getNombresenPartida().get(0));
		System.out.println("ipquedebeborrar "+ nombre.substring(1, nombre.length()-1));
		mymatch.getNombresenPartida().remove(nombre.substring(1, nombre.length()-1));
		return nombre;
	}
}

