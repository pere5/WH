package com.springapp.dao;

/**
 * Created with IntelliJ IDEA.
 * UserForm: perer
 * Date: 2013-11-20
 * Time: 11:04
 * To change this template use File | Settings | File Templates.
 */
import java.util.List;

import com.springapp.model.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

public class WHDao {

    @Autowired
    private MongoOperations mongoTemplate;

    public void doThings(UserForm userForm) {

        // save
        mongoTemplate.save(userForm);

        // now userForm object got the created id.
        System.out.println("1. userForm : " + userForm);

        // query to search userForm
        Query searchUserQuery = new Query(Criteria.where("username").is("DaaGnall"));

        // find the saved userForm again.
        UserForm savedUser = mongoTemplate.findOne(searchUserQuery, UserForm.class);
        System.out.println("2. find - savedUser : " + savedUser);

        // update password
        mongoTemplate.updateFirst(searchUserQuery, Update.update("password", "new password"),UserForm.class);

        // find the updated userForm object
        UserForm updatedUser = mongoTemplate.findOne(searchUserQuery, UserForm.class);

        System.out.println("3. updatedUser : " + updatedUser);

        // delete
        mongoTemplate.remove(searchUserQuery, UserForm.class);

        // List, it should be empty now.
        List<UserForm> listUser = mongoTemplate.findAll(UserForm.class);
        System.out.println("4. Number of userForm = " + listUser.size());

    }

    public void doNothing(UserForm userForm) {
        //To change body of created methods use File | Settings | File Templates.
    }
}
