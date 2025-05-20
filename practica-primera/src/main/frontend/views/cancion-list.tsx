import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, DatePicker, Dialog, Grid, GridColumn, GridItemModel, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';

import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';

import { useDataProvider } from '@vaadin/hilla-react-crud';
import { CancionService } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';
import Cancion from 'Frontend/generated/practica/primera/com/base/models/Cancion';
import TipoArchivoEnum from 'Frontend/generated/practica/primera/com/base/models/TipoArchivoEnum';


export const config: ViewConfig = {
  title: 'Cancion',
  menu: {
    icon: 'vaadin:clipboard-check',
    order: 4,
    title: 'Cancion',
  },
};


type CancionEntryFormProps = {
  onCancionCreated?: () => void;
};

type CancionEntryFormUpdateProps = {
  onCancionUpdate: () => void;
};

function CancionEntryForm(props: CancionEntryFormProps) {
  const dialogOpened = useSignal(false);
  const [tipos, setTipos] = useState<String[]>([]);
  const [generos, setGeneros] = useState<String[]>([]);
  const [albums, setAlbums] = useState<String[]>([]);


  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  const nombre = useSignal('');
  const id_genero = useSignal('');
  const duracion = useSignal('');
  const url = useSignal('');
  const tipo = useSignal('');
  const id_album = useSignal('');
  const createCancion = async () => {
    try {
      if (nombre.value.trim().length > 0 && id_genero.value.trim().length > 0 && url.value.trim().length > 0 && tipo.value.trim().length > 0 && id_album.value.trim().length > 0) {
        const idAlbumValue = parseInt(id_album.value) + 1;
        const idGneroValue = parseInt(id_genero.value) + 1;
        const tipoEnumValue = TipoArchivoEnum[tipo.value as keyof typeof TipoArchivoEnum];
        await CancionService.createCancion(nombre.value, idGneroValue, parseInt(duracion.value), url.value, tipoEnumValue, idAlbumValue);

        if (props.onCancionCreated) {
          props.onCancionCreated();
        }
        nombre.value = '';
        id_genero.value = '';
        duracion.value = '';
        url.value = '';
        tipo.value = '';
        id_album.value = '';

        dialogOpened.value = false;
        Notification.show('Cancion creada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    CancionService.listTipoArchivo()
      .then((result) => setTipos((result || []).filter((tipo): tipo is string => tipo !== undefined)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    CancionService.listaGeneroCombo()
      .then((result) => setGeneros(result))
      .catch(console.error);
  }, []);

  useEffect(() => {
    CancionService.listaAlbumCombo()
      .then((result) => setAlbums(result))
      .catch(console.error);
  }, []);


  return (
    <>
      <Dialog
        aria-label="Registrar Cancion"
        draggable
        modeless
        opened={dialogOpened.value}
        onOpenedChanged={(event) => {
          dialogOpened.value = event.detail.value;
        }}
        header={
          <h2
            className="draggable"
            style={{
              flex: 1,
              cursor: 'move',
              margin: 0,
              fontSize: '1.5em',
              fontWeight: 'bold',
              padding: 'var(--lumo-space-m) 0',
            }}
          >
            Registrar Cancion
          </h2>
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancelar</Button>
            <Button theme="primary" onClick={createCancion}>
              Registrar
            </Button>
          </>
        )}
      >
        <VerticalLayout
          theme="spacing"
          style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
        >
          <VerticalLayout style={{ alignItems: 'stretch' }}>
            <TextField label="Nombre"
              placeholder='Ingrese el nombre de la Cancion'
              aria-label='Ingrese el nombre de la Cancion'
              value={nombre.value}
              onValueChanged={(evt) => (nombre.value = evt.detail.value)}
            />
            <TextField label="Duracion"
              placeholder='Ingrese la duracion de la Cancion'
              aria-label='Ingrese la duracion de la Cancion'
              value={duracion.value}
              onValueChanged={(evt) => (duracion.value = evt.detail.value)}
            />
            <TextField label="Url"
              placeholder='Ingrese la url de la Cancion'
              aria-label='Ingrese la url de la Cancion'
              value={url.value}
              onValueChanged={(evt) => (url.value = evt.detail.value)}
            />
            <ComboBox
              label="Tipo"
              items={tipos}
              value={tipo.value}
              onValueChanged={(e) => (tipo.value = e.detail.value)}
              placeholder="Seleccione el tipo de archivo"
            />
            <ComboBox
              label="Genero"
              items={generos}
              value={id_genero.value}
              onValueChanged={(e) => (id_genero.value = e.detail.value)}
              placeholder="Seleccione el genero"
            />
            <ComboBox
              label="Album"
              items={albums}
              value={id_album.value}
              onValueChanged={(e) => (id_album.value = e.detail.value)}
              placeholder="Seleccione el Album"
            />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Registrar</Button>
    </>
  );
}

///update Cancion 
function CancionEntryFormUpdate(props: CancionEntryFormUpdateProps) {
  const dialogOpened = useSignal(false);
  const [tipos, setTipos] = useState<String[]>([]);
  const [generos, setGeneros] = useState<String[]>([]);
  const [albums, setAlbums] = useState<String[]>([]);

  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  const nombre = useSignal(props.arguments.nombre);
  const id_genero = useSignal(props.arguments.idGenero);
  const duracion = useSignal(props.arguments.duracion);
  const url = useSignal(props.arguments.url);
  const tipo = useSignal(props.arguments.tipo);
  const id_album = useSignal(props.arguments.idAlbum);
  const ident = useSignal(props.arguments.id);

  const updateCancion = async () => {
    try {
      if (nombre.value.trim().length > 0 && id_genero.value.trim().length > 0 && url.value.trim().length > 0 && tipo.value.trim().length > 0 && id_album.value.trim().length > 0) {
        const idAlbumValue = parseInt(id_album.value) + 1;
        const idGneroValue = parseInt(id_genero.value) + 1;
        const tipoEnumValue = TipoArchivoEnum[tipo.value as keyof typeof TipoArchivoEnum];
        await CancionService.updateCancion(parseInt(ident.value), nombre.value, idGneroValue, parseInt(duracion.value), url.value, tipoEnumValue, idAlbumValue);

        if (props.onCancionUpdate) {
          props.onCancionUpdate();
        }
        nombre.value = '';
        id_genero.value = '';
        duracion.value = '';
        url.value = '';
        tipo.value = '';
        id_album.value = '';

        dialogOpened.value = false;
        Notification.show('Cancion editada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo editar, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    CancionService.listTipoArchivo()
      .then((result) => setTipos((result || []).filter((tipo): tipo is string => tipo !== undefined)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    CancionService.listaGeneroCombo()
      .then((result) => setGeneros(result))
      .catch(console.error);
  }, []);

  useEffect(() => {
    CancionService.listaAlbumCombo()
      .then((result) => setAlbums(result))
      .catch(console.error);
  }, []);

  return (
    <>
      <Dialog
        aria-label="Editar Cancion"
        draggable
        modeless
        opened={dialogOpened.value}
        onOpenedChanged={(event) => {
          dialogOpened.value = event.detail.value;
        }}
        header={
          <h2
            className="draggable"
            style={{
              flex: 1,
              cursor: 'move',
              margin: 0,
              fontSize: '1.5em',
              fontWeight: 'bold',
              padding: 'var(--lumo-space-m) 0',
            }}
          >
            Editar Cancion
          </h2>
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancelar</Button>
            <Button theme="primary" onClick={updateCancion}>
              Actualiar
            </Button>
          </>
        )}
      >
        <VerticalLayout
          theme="spacing"
          style={{ width: '300px', maxWidth: '100%', alignItems: 'stretch' }}
        >
          <VerticalLayout style={{ alignItems: 'stretch' }}>
            <TextField label="Nombre"
              placeholder='Ingrese el nombre de la Cancion'
              aria-label='Ingrese el nombre de la Cancion'
              value={nombre.value}
              onValueChanged={(evt) => (nombre.value = evt.detail.value)}
            />
            <TextField label="Duracion"
              placeholder='Ingrese la duracion de la Cancion'
              aria-label='Ingrese la duracion de la Cancion'
              value={duracion.value}
              onValueChanged={(evt) => (duracion.value = evt.detail.value)}
            />
            <TextField label="Url"
              placeholder='Ingrese la url de la Cancion'
              aria-label='Ingrese la url de la Cancion'
              value={url.value}
              onValueChanged={(evt) => (url.value = evt.detail.value)}
            />
            <ComboBox
              label="Tipo"
              items={tipos}
              value={tipo.value}
              onValueChanged={(e) => (tipo.value = e.detail.value)}
              placeholder="Seleccione el tipo de archivo"
            />
            <ComboBox
              label="Genero"
              items={generos}
              value={id_genero.value}
              onValueChanged={(e) => (id_genero.value = e.detail.value)}
              placeholder="Seleccione el genero"
            />
            <ComboBox
              label="Album"
              items={albums}
              value={id_album.value}
              onValueChanged={(e) => (id_album.value = e.detail.value)}
              placeholder="Seleccione el Album"
            />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Editar</Button>
    </>
  );
}


function index({ model }: { model: GridItemModel<Cancion> }) {
  return (
    <span>
      {model.index + 1}
    </span>
  );
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function fechaRenderer({ item }: { item: Cancion }) {
  return (
    <span>
      {item.fecha ? dateFormatter.format(new Date(item.fecha)) : ''}
    </span>
  );
}


export default function CancionListView() {
  const dataProvider = useDataProvider<Cancion>({
    list: () => CancionService.lisAll(),
  });

  function link({ item }: { item: Cancion }) {
    return (
      <span>
        <CancionEntryFormUpdate arguments={item} onCancionUpdate={dataProvider.refresh} />
      </span>
    );
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Cancions">
        <Group>
          <CancionEntryForm onCancionCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn header="Nro" renderer={index} />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn path="id_genero" header="Genero" />
        <GridColumn path="duracion" header="Duracion" />
        <GridColumn path="url" header="Url" />
        <GridColumn path="tipo" header="Tipo de Archivo" />
        <GridColumn path="id_album" header="Album" />
        <GridColumn header="Acciones" renderer={link} />
      </Grid>
    </main>
  );
}
