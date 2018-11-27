package es.juegosenred.backend.fightforthehood;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	public String putIp(@RequestBody String batalla){	
	mymatch.getHistorial().add(batalla);
	ReaderWriter.Escritor(mymatch.getHistorial());
	System.out.println(mymatch.getHistorial().size());
	return batalla;
	}
}
