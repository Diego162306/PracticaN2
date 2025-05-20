import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, DatePicker, Dialog, Grid, GridColumn, GridItemModel, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';

import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';

import { useDataProvider } from '@vaadin/hilla-react-crud';
import { AlbumService } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';
import Album from 'Frontend/generated/practica/primera/com/base/models/Album';


export const config: ViewConfig = {
  title: 'Album',
  menu: {
    icon: 'vaadin:clipboard-check',
    order: 3,
    title: 'Album',
  },
};


type AlbumEntryFormProps = {
  onAlbumCreated?: () => void;
};

type AlbumEntryFormUpdateProps = {
  onAlbumUpdate: () => void;
};

function AlbumEntryForm(props: AlbumEntryFormProps) {
  const dialogOpened = useSignal(false);
  const [bandas, setBandas] = useState<String[]>([]);


  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  const nombre = useSignal('');
  const fecha = useSignal('');
  const id_Banda = useSignal('');

  const createAlbum = async () => {
    try {
      if (nombre.value.trim().length > 0 && fecha.value.trim().length > 0) {
        const idBnadaValue = parseInt(id_Banda.value)+ 1;
        await AlbumService.createAlbum(nombre.value, fecha.value, idBnadaValue); 

        if (props.onAlbumCreated) {
          props.onAlbumCreated();
        }
        nombre.value = '';
        dialogOpened.value = false;
        Notification.show('Album creada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    AlbumService.listaBandombo()
      .then((result) => setBandas(result))
      .catch(console.error);
  }, []);


  return (
    <>
      <Dialog
        aria-label="Registrar Album"
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
            Registrar Album
          </h2>
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancelar</Button>
            <Button theme="primary" onClick={createAlbum}>
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
              placeholder='Ingrese el nombre de la Album'
              aria-label='Ingrese el nombre de la Album'
              value={nombre.value}
              onValueChanged={(evt) => (nombre.value = evt.detail.value)}
            />
            <DatePicker
              label="Fecha de creación"
              placeholder="Seleccione una fecha"
              aria-label="Seleccione una fecha"
              value={fecha.value ?? undefined}
              onValueChanged={(evt) => (fecha.value = evt.detail.value)}
            />
             <ComboBox
              label="Banda"
              items={bandas}
              value={id_Banda.value}
              onValueChanged={(e) => (id_Banda.value = e.detail.value)}
              placeholder="Seleccione la Banda"
            />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Registrar</Button>
    </>
  );
}

///update Album 
function AlbumEntryFormUpdate(props: AlbumEntryFormUpdateProps) {
  const dialogOpened = useSignal(false);
  const [bandas, setBandas] = useState<String[]>([]);


  const open = () => {
    dialogOpened.value = true;
  };

  const close = () => {
    dialogOpened.value = false;
  };

  const nombre = useSignal(props.arguments.nombre);
  const fecha = useSignal(props.arguments.fecha);
  const id_Banda = useSignal(props.arguments.idBanda);
  const ident = useSignal(props.arguments.id);

  const updateAlbum = async () => {
    try {
      if (nombre.value.trim().length > 0 && fecha.value.trim().length > 0) {
        const idBnadaValue = parseInt(id_Banda.value)+ 1;
        await AlbumService.updateAlbum(parseInt(ident.value), nombre.value, fecha.value, idBnadaValue);

        if (props.onAlbumUpdate) {
          props.onAlbumUpdate();
        }
        nombre.value = '';
        fecha.value = '';
        id_Banda.value = '';
        dialogOpened.value = false;
        Notification.show('Album editada exitosamente', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo editar, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    AlbumService.listaBandombo()
      .then((result) => setBandas(result))
      .catch(console.error);
  }, []);

  return (
    <>
      <Dialog
        aria-label="Editar Album"
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
            Editar Album
          </h2>
        }
        footerRenderer={() => (
          <>
            <Button onClick={close}>Cancelar</Button>
            <Button theme="primary" onClick={updateAlbum}>
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
              placeholder='Ingrese el nombre de la Album'
              aria-label='Ingrese el nombre de la Album'
              value={nombre.value}
              onValueChanged={(evt) => (nombre.value = evt.detail.value)}
            />
             <DatePicker
              label="Fecha de creación"
              placeholder="Seleccione una fecha"
              aria-label="Seleccione una fecha"
              value={fecha.value ?? undefined}
              onValueChanged={(evt) => (fecha.value = evt.detail.value)}
            />
            <ComboBox
              label="Banda"
              items={bandas}
              value={id_Banda.value}
              onValueChanged={(e) => (id_Banda.value = e.detail.value)}
              placeholder="Seleccione la Banda"
            />
          </VerticalLayout>
        </VerticalLayout>
      </Dialog>
      <Button onClick={open}>Editar</Button>
    </>
  );
}


function index({ model }: { model: GridItemModel<Album> }) {
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

function fechaRenderer({ item }: { item: Album }) {
  return (
    <span>
      {item.fecha ? dateFormatter.format(new Date(item.fecha)) : ''}
    </span>
  );
}


export default function AlbumListView() {
  const dataProvider = useDataProvider<Album>({
    list: () => AlbumService.lisAll(),
  });

  function link({ item }: { item: Album }) {
    return (
      <span>
       <AlbumEntryFormUpdate arguments ={item} onAlbumUpdate={dataProvider.refresh} />
      </span>
    );
  }

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Albums">
        <Group>
          <AlbumEntryForm onAlbumCreated={dataProvider.refresh} />
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn header="Nro" renderer={index} />
        <GridColumn path="nombre" header="Nombre del Album" />
        <GridColumn path="id_banda" header="Banda" />
        <GridColumn header="Fecha de creación" renderer={fechaRenderer} />
        <GridColumn header="Acciones" renderer={link} />
      </Grid>
    </main>
  );
}
