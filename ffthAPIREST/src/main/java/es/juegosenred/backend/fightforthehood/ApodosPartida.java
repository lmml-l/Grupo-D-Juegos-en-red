package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/apodos")
public class ApodosPartida {
	
	@Autowired
	private MyMatch mymatch;
	
	
	@GetMapping("/apodolist")
	public ResponseEntity<ArrayList<String>> getApodos(){
		ArrayList<String> llistadeapodos = (ArrayList<String>) mymatch.getListadeapodos().values();
		return new ResponseEntity<ArrayList<String>>(llistadeapodos,HttpStatus.OK);
	}
	
	
	@GetMapping("/apodolist/{ip}")
	public ResponseEntity<String> getapodo(@PathVariable String ip){
		return new ResponseEntity<>(mymatch.getListadeapodos().get(ip), HttpStatus.OK);
	}
}

