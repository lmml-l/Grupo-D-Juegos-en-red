package es.juegosenred.backend.fightforthehood;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class getIpsPartida {

	@GetMapping(value="/partida/IpsPartida/{id}")
	public ResponseEntity<MyMatch> getIpsThisPartida(@PathVariable String ipsPartida, @RequestBody MyMatch partidaActualizada) {
		return new ResponseEntity<>(partidaActualizada, HttpStatus.OK);
		//return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
