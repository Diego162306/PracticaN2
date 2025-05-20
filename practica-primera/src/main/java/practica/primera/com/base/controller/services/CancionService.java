package practica.primera.com.base.controller.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.hibernate.validator.constraints.URL;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import practica.primera.com.base.controller.dao.dao_models.DaoAlbum;
import practica.primera.com.base.controller.dao.dao_models.DaoCancion;
import practica.primera.com.base.controller.dao.dao_models.DaoGenero;
import practica.primera.com.base.controller.excepcion.ListEmptyException;
import practica.primera.com.base.models.Album;
import practica.primera.com.base.models.Cancion;
import practica.primera.com.base.models.Genero;
import practica.primera.com.base.models.TipoArchivoEnum;

@BrowserCallable
@AnonymousAllowed
public class CancionService {

    private DaoCancion db;
    public CancionService() {
        db = new DaoCancion();
    }
    public void createCancion(@NotEmpty @NotBlank @NonNull String nombre, Integer id_genero, Integer duracion,
    @NotBlank @URL String url, TipoArchivoEnum tipo, Integer id_album) throws Exception {
        if (nombre.trim().length() > 0 && id_genero > 0 && duracion > 0 && url.trim().length() > 0 && tipo != null && id_album > 0) {
            db.getObj().setNombre(nombre);
            db.getObj().setId_genero(id_genero);
            db.getObj().setDuracion((duracion));
            db.getObj().setUrl(url);
            db.getObj().setTipo(tipo);
            db.getObj().setId_album(id_album);
            if (!db.save()) {
                throw new Exception("Error al guardar la cancion");
            }
        }
    }

    public void updateCancion(Integer id, @NotEmpty @NotBlank @NonNull String nombre,Integer id_genero,
    Integer duracion, @NotBlank @URL String url, TipoArchivoEnum tipo, Integer id_album) throws Exception {
        if (id != null && id > 0 && nombre.trim().length() > 0 && id_genero > 0 && duracion > 0 && url.trim().length() > 0 && tipo != null && id_album > 0) {
            db.setObj(db.listAll().get(id - 1));
            db.getObj().setNombre(nombre);
            db.getObj().setId_genero(id_genero);
            db.getObj().setDuracion(duracion);
            db.getObj().setUrl(url);
            db.getObj().setTipo(tipo);
            db.getObj().setId_album(id_album);
            if (!db.update(id - 1)) {
                throw new Exception("Error al actualizar la cancion");
            }
        }
    }

    public List<HashMap> lisAll() throws ListEmptyException {
        List<HashMap> list = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Cancion[] arreglo = db.listAll().toArray();
            DaoGenero dg = new DaoGenero();
            DaoAlbum da = new DaoAlbum();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString());
                aux.put("nombre", arreglo[i].getNombre());
                aux.put("id_genero", dg.listAll().get(arreglo[i].getId_genero() - 1).getNombre());
                aux.put("duracion", arreglo[i].getDuracion().toString());
                aux.put("url", arreglo[i].getUrl());
                aux.put("tipo", arreglo[i].getTipo().name());
                aux.put("id_album", da.listAll().get(arreglo[i].getId_album() - 1).getNombre());
                list.add(aux);
            }
        }
        return list;
    }

     public List<HashMap> listaGeneroCombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoGenero dg = new DaoGenero();
        if (!dg.listAll().isEmpty()) {
            Genero[] arreglo = dg.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i));
                aux.put("label", arreglo[i].getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }

    public List<HashMap> listaAlbumCombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoAlbum da = new DaoAlbum();
        if (!da.listAll().isEmpty()) {
            Album[] arreglo = da.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i));
                aux.put("label", arreglo[i].getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }

    public List<Cancion> lisAllCancion(){
        return Arrays.asList(db.listAll().toArray());
        
    }

    public List<String> listTipoArchivo() {
        List<String> lista = new ArrayList<>();
        for (TipoArchivoEnum tipo : TipoArchivoEnum.values()) {
            lista.add(tipo.name()); 
        }
        return lista;
    }
    
    
    
}
