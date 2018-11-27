package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistorialController {
	
	@Autowired
	private MyMatch mymatch;
	
	@PutMapping("/lastmatch")
	@ResponseStatus(HttpStatus.CREATED)
	public String putLastMatch(@RequestBody String batalla){	
		mymatch.getHistorial().add(batalla);
		ReaderWriter.Escritor(mymatch.getHistorial());
		System.out.println(mymatch.getHistorial().size());
		return batalla;
	}
	
	@GetMapping("/lastmatches")
	@ResponseStatus(HttpStatus.CREATED)
	public String[] getLastMatches(@PathVariable String[] historial ){
		historial = new String[5];
		for(int i = 0; i<5; i++) {
			historial[i] = mymatch.getHistorial().get(i);
			System.out.println(mymatch.getHistorial().get(i));
		}
		return historial;
	}
}
