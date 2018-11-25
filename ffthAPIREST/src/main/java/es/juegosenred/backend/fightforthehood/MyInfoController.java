package es.juegosenred.backend.fightforthehood;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyInfoController {
	
	@Autowired
	private MyMatch mymatch;
	private MyInfo myInfo;
	
	@PutMapping("/myinfo")
	public MyInfo postMyInfo(@RequestBody MyInfo myinfo){
		
		myInfo = myinfo;
		mymatch.getIpsPartida().add(myInfo.getIp());
		mymatch.getListadeapodos().put(myInfo.getIp(), myInfo.getApodo());
		return myinfo;
	}
	
}
