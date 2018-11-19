package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ApodosPartida {
	
	@Autowired
	private MyMatch mymatch;
	
	@GetMapping
	public ResponseEntity<ArrayList<String>> getApodos(){
		ArrayList<String> listadeapodos = (ArrayList<String>) mymatch.getListadeapodos().values();
		return new ResponseEntity<ArrayList<String>>(listadeapodos,HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<String> getapodo(String ip){
		return new ResponseEntity<>(mymatch.getListadeapodos().get(ip), HttpStatus.OK);
	}
}
