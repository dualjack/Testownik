package pl.dualjack.testownik;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.widget.*;

import java.util.zip.Inflater;

public class LibraryActivity extends AppCompatActivity {

    LinearLayout library;
    LayoutInflater inflater;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_library);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        library = (LinearLayout) findViewById(R.id.library);

        for(int x=0; x<50; x++){

            RelativeLayout item = (RelativeLayout) getLayoutInflater().inflate(R.layout.library_item,null);

            TextView item_title = (TextView) item.findViewById(R.id.lib_item_title);
            TextView item_desc = (TextView) item.findViewById(R.id.lib_item_desc);

            item_title.setText("test z pedalstwa");
            item_desc.setText("Dodano 1.04.2016 przez Jakub; Dostępna aktualizacja");

            item.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent nextScreen = new Intent(getApplicationContext(),QuizActivity.class);
                    startActivity(nextScreen);
                }
            });

            library.addView(item);

        }

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Toast.makeText(getApplicationContext(),"Nie ma powrotu :C",Toast.LENGTH_SHORT).show();

    }
}
