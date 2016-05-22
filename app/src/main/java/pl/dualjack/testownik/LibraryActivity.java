package pl.dualjack.testownik;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.View;
import android.widget.*;

import java.util.ArrayList;
import java.util.HashMap;


public class LibraryActivity extends AppCompatActivity {

    LinearLayout libraryLayout;
    HashMap<String,String> libraryItem;
    ArrayList<HashMap<String,String>> library;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_library);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        libraryLayout = (LinearLayout) findViewById(R.id.library);

        library = new ArrayList<>();

        libraryItem = new HashMap<>();
        libraryItem.put("title","Test tytułu");
        libraryItem.put("desc","Test opisu");
        libraryItem.put("id","Test id");


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

            libraryLayout.addView(item);

        }

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



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
