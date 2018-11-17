package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateGame {
	
	private MyMatch match = new MyMatch();

	@PutMapping(value="/partida/idPartida/{id}")
	public ResponseEntity<MyMatch> actulizaAnuncio(@PathVariable long id, 
			@RequestBody MyMatch partidaActualizada) {
		ActualizarPartida(match);
		return new ResponseEntity<>(partidaActualizada, HttpStatus.OK);
		//return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	public int ActualizarPartida(MyMatch match) {
		String key = ((Integer)match.getIdPartida()).toString();
		ArrayList<String> lista = match.getIpsPartida().get(key);
		if(lista.size()==2) {
			match.setIdPartida(match.getIdPartida()+1);
		}
		return match.getIdPartida();
	}

	public MyMatch getMatch() {
		return match;
	}

	public void setMatch(MyMatch match) {
		this.match = match;
	}
	
	
}
