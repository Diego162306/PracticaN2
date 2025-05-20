package practica.primera.com.base.controller.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import practica.primera.com.base.controller.dao.dao_models.DaoAlbum;
import practica.primera.com.base.controller.dao.dao_models.DaoBanda;
import practica.primera.com.base.controller.excepcion.ListEmptyException;
import practica.primera.com.base.models.Album;
import practica.primera.com.base.models.Banda;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Endpoint;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

@BrowserCallable
@AnonymousAllowed
@Endpoint
public class AlbumService {

    private DaoAlbum db;

    public AlbumService() {
        db = new DaoAlbum();
    }

    public void createAlbum(@NotEmpty @NotBlank @NonNull String nombre, @NonNull Date fecha, Integer id_Banda)
            throws Exception {
        if (nombre.trim().length() > 0) {
            db.getObj().setNombre(nombre);
            db.getObj().setFecha(fecha);
            db.getObj().setId_Banda(id_Banda);
            if (!db.save()) {
                throw new Exception("Error al guardar la Album");
            }
        }
    }

    public void updateAlbum(Integer id, @NotEmpty @NotBlank @NonNull String nombre, @NonNull Date fecha,
            Integer id_Banda) throws Exception {
        if (id != null && id > 0 && nombre.trim().length() > 0) {
            db.setObj(db.listAll().get(id - 1));
            db.getObj().setNombre(nombre);
            db.getObj().setFecha(fecha);
            db.getObj().setId_Banda(id_Banda);
            if (!db.update(id - 1)) {
                throw new Exception("Error no se pudo modificar la Album");
            }
        }
    }

    public List<HashMap> lisAll() throws ListEmptyException {
        List<HashMap> list = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Album[] arreglo = db.listAll().toArray();
            DaoBanda daoBanda = new DaoBanda();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 

            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString());
                aux.put("nombre", arreglo[i].getNombre());
                aux.put("fecha", sdf.format(arreglo[i].getFecha()));
                aux.put("id_banda", daoBanda.listAll().get(arreglo[i].getId_Banda() - 1).getNombre());
                list.add(aux);
            }
        }
        return list;
    }

    public List<HashMap> listaBandombo() {
        List<HashMap> lista = new ArrayList<>();
        DaoBanda da = new DaoBanda();
        if (!da.listAll().isEmpty()) {
            Banda[] arreglo = da.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i));
                aux.put("label", arreglo[i].getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }

    public List<Album> lisAllAlbum() {
        return Arrays.asList(db.listAll().toArray());

    }
}
