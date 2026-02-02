package com.arogya.flow.utils;

import com.arogya.flow.entity.enums.TokenSource;

public class PriorityUtils {
    private PriorityUtils(){

    }

    public static int calculatePriority(TokenSource source){
        return switch(source){
            case EMERGENCY -> 1;
            case WALK_IN -> 2;
            case ONLINE -> 3;
        };
    }
}
