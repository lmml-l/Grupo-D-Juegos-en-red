package es.juegosenred.backend.fightforthehood;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyInfoController {
	
	@Autowired
	private MyMatch mymatch = new MyMatch();
	
	@PutMapping("/myinfo/{ip}")
	@ResponseStatus(HttpStatus.CREATED)
	public MyInfo putMyInfo(@RequestBody MyInfo myinfo, @PathVariable String ip ){	
		mymatch.getListadeapodos().put(myinfo.getIp(), myinfo.getApodo());
		//System.out.println(mymatch.getListadeapodos().get(myinfo.getIp()));
		return myinfo;
	}
	
}
