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
		System.out.println(myinfo.getIp());
		System.out.println(mymatch.getListadeapodos().get(myinfo.getIp()));
		return myinfo;
	}
	/*
	@GetMapping("/myinfo/{ip}/resptime")
	@ResponseStatus(HttpStatus.CREATED)
	public float getMyResponseTime(@RequestBody MyInfo myinfo, @PathVariable String ip){
		return myinfo.getResptime();
	}
	
	@PutMapping("/myinfo/{ip}/resptime")
	@ResponseStatus(HttpStatus.CREATED)
	public float putMyResponseTime(@RequestBody MyInfo myinfo, @PathVariable String ip, float resptime){	
		myinfo.setResptime(resptime);
		System.out.println(myinfo.getResptime());
		return resptime;
	}
	
	@PutMapping("/myinfo/{ip}/resptime")
	@ResponseStatus(HttpStatus.CREATED)
	public void putMyRTToZero(@RequestBody MyInfo myinfo, @PathVariable String ip){	
		myinfo.setResptime(0);
		System.out.println(myinfo.getResptime());
	}
	*/
}
