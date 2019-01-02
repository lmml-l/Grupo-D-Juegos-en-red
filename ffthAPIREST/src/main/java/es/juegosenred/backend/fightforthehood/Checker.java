package es.juegosenred.backend.fightforthehood;

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
@RequestMapping("/check")
public class Checker {
	
	@Autowired
	private MyMatch mymatch;
		
	@GetMapping("/checker")
	@ResponseStatus(HttpStatus.CREATED)
	public String getCheckerStatus(){
		System.out.println("Valor de check: " + mymatch.getChecker());
		return mymatch.getChecker();
	}
	
	@PutMapping("/checker")
	@ResponseStatus(HttpStatus.CREATED)
	public void putIp(@PathVariable String check){
		mymatch.setChecker(check);
		System.out.println("Valor de check: " + check);
	}
}

