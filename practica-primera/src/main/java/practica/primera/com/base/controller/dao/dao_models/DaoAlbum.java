package practica.primera.com.base.controller.dao.dao_models;

import java.util.Date;

import practica.primera.com.base.controller.DataStruc.List.Linkendlist;
import practica.primera.com.base.controller.dao.AdapterDao;
import practica.primera.com.base.models.Album;

public class DaoAlbum extends AdapterDao<Album> {
    private Album obj;
    private Linkendlist<Album> listAll;

    public DaoAlbum() {
        super(Album.class);
        // TODO Auto-generated constructor stub
    }

    // getter and setter
    public Album getObj() {
        if (obj == null) {
            this.obj = new Album();

        }
        return this.obj;
    }

    public void setObj(Album obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(this.listAll().getLength() + 1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            
            return false;
            // TODO: handle exception
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            
            return false;
            // TODO: handle exception
        }
    }
    public Linkendlist<Album> getListAll() { // Obtiene la lista de objetos
        if (listAll == null) { // Si la lista es nula
            this.listAll = listAll(); // Invoca el método listAll() para obtener la lista de objetos
        }
        return listAll; // Devuelve la lista de objetos de la variable listAll
    }


    public static void main(String[] args) {
        DaoAlbum da = new DaoAlbum();
        da.getObj().setId(da.listAll().getLength() + 1);
         da.getObj().setFecha(new Date());
        da.getObj().setId_Banda(2);
        da.getObj().setNombre("Sexolandia 1");
        if (da.save()) {
            System.out.println("Guardado");
        } else {
            System.out.println("Error al guardar");

        }
        System.out.println(da.getListAll().getLength());
       
        
    }

}
