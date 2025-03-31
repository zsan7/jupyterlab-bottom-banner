import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab-bottom-banner extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-bottom-banner:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-bottom-banner is activated!');

    // Crear el widget del banner
    const banner = new Widget();
    banner.id = 'custom-bottom-banner';
    banner.node.textContent = 'Este es tu banner personalizado en la parte inferior!';
    banner.node.style.backgroundColor = 'lightblue'; // Estilo básico
    banner.node.style.padding = '5px';
    banner.node.style.textAlign = 'center';
    banner.node.style.fontSize = '12px';
    banner.node.style.position = 'fixed'; // Posicionamiento fijo
    banner.node.style.bottom = '0';
    banner.node.style.left = '0';
    banner.node.style.width = '100%';
    banner.node.style.zIndex = '10000'; // Asegura que esté por encima de otros elementos

    // Añadir el banner al 'shell' de la aplicación (directamente al body)
    // Otra opción sería añadirlo a app.shell.bottomArea si quisieras usar esa zona específica,
    // pero puede requerir más ajustes de layout. Añadirlo al body es más directo para un banner fijo.
    document.body.appendChild(banner.node);

    // Opcional: Ajustar el padding inferior del área principal para que el banner no solape contenido
    // Esto puede ser más complejo de hacer correctamente dependiendo del tema y otras extensiones.
    // Una forma simple (pero que podría necesitar ajustes):
    // const mainArea = document.getElementById('jp-main-dock-panel');
    // if (mainArea) {
    //    mainArea.style.marginBottom = banner.node.offsetHeight + 'px';
    // }
  }
};

export default plugin;