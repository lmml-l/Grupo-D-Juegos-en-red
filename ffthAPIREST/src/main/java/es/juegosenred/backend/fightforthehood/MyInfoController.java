package es.juegosenred.backend.fightforthehood;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/myinfo")
public class MyInfoController {
	
	@Autowired
	private MyMatch mymatch;
	
	@PostMapping
	public ResponseEntity<MyInfo> postMyInfo(@RequestBody MyInfo myinfo){
		mymatch.getIpsPartida().add(myinfo.getIp());
		mymatch.getListadeapodos().put(myinfo.getIp(), myinfo.getApodo());
		return new ResponseEntity<>(myinfo, HttpStatus.OK);
		
	}
}
