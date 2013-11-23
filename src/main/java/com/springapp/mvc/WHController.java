package com.springapp.mvc;

import static org.springframework.web.bind.annotation.RequestMethod.*;

import com.springapp.dao.WHDao;
import com.springapp.model.UserForm;
import com.springapp.mvc.util.WHControllerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hello.htm")
public class WHController {

    @Autowired
    private WHControllerUtil wiredWHUtil;
    @Autowired
    private WHDao wiredWHDao;

	@RequestMapping(method=GET)
	public String printWelcome(Model model) {
        wiredWHUtil.prepareModel(model, "Spring MVC!");
		return "gameScreen";
	}

    @RequestMapping(method=POST)
    public String showRegistrationForm(UserForm userForm, Model model) {
        wiredWHUtil.prepareModel(model, "Spring MVC: " + userForm.getUsername());
        wiredWHDao.doNothing(userForm);
        return "gameScreen";
    }
}