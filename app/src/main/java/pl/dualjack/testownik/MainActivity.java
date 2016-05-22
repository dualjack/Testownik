package pl.dualjack.testownik;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.widget.RelativeLayout;

public class MainActivity extends AppCompatActivity {

    RelativeLayout splashscreen;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        splashscreen = (RelativeLayout) findViewById(R.id.splashscreen);
        splashscreen.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {

                Intent nextScreen = new Intent(getApplicationContext(),WebViewActivity.class);
                startActivity(nextScreen);
                finish();   // close splashscreen ( main activity )

                return false;
            }
        });

    }
}
