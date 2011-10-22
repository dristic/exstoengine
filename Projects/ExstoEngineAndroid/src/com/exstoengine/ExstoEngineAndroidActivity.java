package com.exstoengine;

import android.app.Activity;
import android.os.Bundle;
import android.view.*;

import com.phonegap.*;

public class ExstoEngineAndroidActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
    
    @Override
    public void init() {
    	super.init();
    	
    	this.appView.setFocusable(false);
    	this.appView.setFocusableInTouchMode(false);
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (this.appView == null) {
            return super.onKeyDown(keyCode, event);
        }

        // If up key
        if (keyCode == KeyEvent.KEYCODE_DPAD_LEFT) {
            this.appView.loadUrl("javascript:dpad.left=true;");
            return true;
        } else if (keyCode == KeyEvent.KEYCODE_DPAD_RIGHT) {
        	this.appView.loadUrl("javascript:dpad.right=true;");
            return true;
        } else if (keyCode == KeyEvent.KEYCODE_DPAD_UP) {
        	this.appView.loadUrl("javascript:dpad.up=true;");
            return true;
        } else if (keyCode == 99) {
        	this.appView.loadUrl("javascript:dpad.square=true;");
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }
    
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
    	if(keyCode == KeyEvent.KEYCODE_DPAD_LEFT) {
    		this.appView.loadUrl("javascript:dpad.left=false;");
            return true;
    	} else if (keyCode == KeyEvent.KEYCODE_DPAD_RIGHT) {
        	this.appView.loadUrl("javascript:dpad.right=false;");
            return true;
        } else if (keyCode == KeyEvent.KEYCODE_DPAD_UP) {
        	this.appView.loadUrl("javascript:dpad.up=false;");
            return true;
        } else if (keyCode == 99) {
        	this.appView.loadUrl("javascript:dpad.square=false;");
            return true;
        }
    	
    	return super.onKeyUp(keyCode, event);
    }
}