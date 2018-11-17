package es.juegosenred.backend.fightforthehood;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JoinPlayer {
	
	private MyMatch match = new MyMatch();
	private MyInfo info = new MyInfo();
	private AddPlayerToMatch addPlayer = new AddPlayerToMatch();
	private UpdateGame actualizarPartida = new UpdateGame();
	
	
	@GetMapping(value="/partida/key/{id}")
	public ResponseEntity<MyMatch> getIpsThisPartida(@PathVariable String key, @RequestBody MyMatch partidaActualizada) {
		joinPlayer(match, info);
		return new ResponseEntity<>(partidaActualizada, HttpStatus.OK);
		//return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	public String joinPlayer(MyMatch match, MyInfo info) {
		String key = addPlayer.AddPlayertoMatch(match, info);
		match.setIdPartida(actualizarPartida.ActualizarPartida(match));
		return key;
	}

	public MyMatch getMatch() {
		return match;
	}

	public void setMatch(MyMatch match) {
		this.match = match;
	}

	public MyInfo getInfo() {
		return info;
	}

	public void setInfo(MyInfo info) {
		this.info = info;
	}
	
	
}
