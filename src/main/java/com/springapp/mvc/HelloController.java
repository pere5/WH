package com.springapp.mvc;

import static org.springframework.web.bind.annotation.RequestMethod.*;

import com.springapp.model.RegisterForm;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/hello.htm")
public class HelloController {
	@RequestMapping(method=GET)
	public String printWelcome(Model model) {
		model.addAttribute("message", "Spring MVC!");
        model.addAttribute(new RegisterForm());
		return "gameScreen";
	}

    @RequestMapping(method=POST)
    public String showRegistrationForm(RegisterForm registerForm, Model model) {
        model.addAttribute("message", "Spring MVC: " + registerForm.getPassword());
        registerForm.setUsername("DaaGnall");
        model.addAttribute(registerForm);
        return "gameScreen";
    }
}