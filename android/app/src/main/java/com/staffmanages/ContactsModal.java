package com.staffmanages;

/**
 * Created by Administrator on 2018/6/3.
 */

public class ContactsModal {
    public ContactsModal(String name, String number) {
        this.name = name;
        this.number = number;
    }

    private String name;
    private String number;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
