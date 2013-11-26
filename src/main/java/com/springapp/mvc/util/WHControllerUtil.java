package com.springapp.mvc.util;

import com.springapp.model.UserForm;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

/**
 * Created with IntelliJ IDEA.
 * User: perer
 * Date: 2013-11-20
 * Time: 12:55
 * To change this template use File | Settings | File Templates.
 */
@Service
public class WHControllerUtil {
    public void prepareModel(Model model, String message) {
        model.addAttribute("message", message);
        model.addAttribute(new UserForm("daagnall@hotmail.com", "DaaGnall"));
    }
}
