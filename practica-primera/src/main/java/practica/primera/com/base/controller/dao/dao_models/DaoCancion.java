package practica.primera.com.base.controller.dao.dao_models;

import practica.primera.com.base.controller.DataStruc.List.Linkendlist;
import practica.primera.com.base.controller.dao.AdapterDao;
import practica.primera.com.base.models.Cancion;

public class DaoCancion extends AdapterDao<Cancion> {
    private Cancion obj;
    private Linkendlist<Cancion> aux;

    public DaoCancion() {
        super(Cancion.class);
        // TODO Auto-generated constructor stub
    }

    // getter and setter
    public Cancion getObj() {
        if (obj == null) {
            this.obj = new Cancion();

        }
        return this.obj;
    }

    public void setObj(Cancion obj) {
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

    public Linkendlist<Cancion> getListAll() {
        if (aux == null) {
            this.aux = listAll();
        }
        return aux;
    }

}
