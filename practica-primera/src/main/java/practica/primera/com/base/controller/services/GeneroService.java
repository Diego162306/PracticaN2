package practica.primera.com.base.controller.services;

import java.util.Arrays;
import java.util.List;


import practica.primera.com.base.controller.dao.dao_models.DaoGenero;

import practica.primera.com.base.models.Genero;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

@BrowserCallable
@AnonymousAllowed
public class GeneroService {

    private DaoGenero db;
    public GeneroService() {
        db = new DaoGenero();
    }

    public void createGenero(@NotEmpty @NotBlank @NonNull String nombre) throws Exception {
        if (nombre.trim().length() > 0 ) {
            db.getObj().setNombre(nombre);
            if (!db.save()) {
                throw new Exception("Error al guardar la Genero");
            }
        }
    }

    public void updateGenero(Integer id, @NotEmpty @NotBlank @NonNull String nombre) throws Exception {
        if (id != null && id > 0 && nombre.trim().length() > 0) {
            db.setObj(db.listAll().get(id - 1));
            db.getObj().setNombre(nombre);
            if (!db.update(id - 1)) {
                throw new Exception("Error no se pudo modificar la Genero");
            }
        }
    }

    public List<Genero> lisAllGenero(){
        return Arrays.asList(db.listAll().toArray());
        
    }
    
}
