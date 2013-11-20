package com.springapp.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.hibernate.validator.constraints.Email;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
/**
 * Created with IntelliJ IDEA.
 * User: perer
 * Date: 2013-11-11
 * Time: 22:24
 * To change this template use File | Settings | File Templates.
 */


@Document(collection = "users")
public class UserForm {

    @Id
    private String id;
    @NotNull
    @Size(min=5, max=16, message="{username.size}")
    private String username;
    @NotNull
    @Size(min=5, max=25, message="{password.size}")
    private String password;
    @NotNull
    @Email(message="{email.valid}")
    private String email;

    public UserForm() {}

    public UserForm(String email, String userName) {
        this.email = email;
        this.username = userName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object obj) {
        return EqualsBuilder.reflectionEquals(this, obj);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }
}