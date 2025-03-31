import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IStatusBar } from '@jupyterlab/statusbar';

import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab-wom-banner extension.
 * Cambiamos el ID para reflejar mejor el propósito.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-wom-banner:plugin',
  autoStart: true,
  // Solicitamos IStatusBar como una dependencia opcional.
  // Si la barra de estado no está disponible por alguna razón, la extensión no fallará.
  optional: [IStatusBar],
  activate: (app: JupyterFrontEnd, statusBar: IStatusBar | null) => {
    console.log('JupyterLab extension jupyterlab-wom-banner is activating!');

    // Verifica si la barra de estado está disponible
    if (!statusBar) {
      console.warn('StatusBar not available, cannot add WOM banner.');
      return;
    }

    // --- Crear el Widget del Banner para la Barra de Estado ---

    // Crea un widget simple para contener nuestro texto y estilo.
    const bannerWidget = new Widget();
    bannerWidget.id = 'wom-performance-banner';

    // Aplica los estilos solicitados
    bannerWidget.node.style.backgroundColor = '#32174d'; // Russian Violet
    bannerWidget.node.style.color = 'white';          // Texto blanco
    bannerWidget.node.style.fontWeight = 'bold';       // Texto en negrita
    bannerWidget.node.style.padding = '2px 8px';       // Padding interno (vertical, horizontal) para que no esté pegado a los bordes
    bannerWidget.node.style.fontSize = '11px';         // Un tamaño de fuente adecuado para la barra de estado
    bannerWidget.node.style.lineHeight = '16px';       // Ajusta la altura de línea para centrar verticalmente si es necesario
    bannerWidget.node.style.borderRadius = '2px';      // Bordes ligeramente redondeados (opcional, estético)
    bannerWidget.node.style.marginRight = '4px';       // Un pequeño margen a la derecha para separarlo de otros elementos

    // Establece el texto solicitado
    bannerWidget.node.textContent = 'WOM | Equipo Performance (Network)';

    // --- Añadir el Widget a la Barra de Estado ---

    // Registra nuestro widget en la barra de estado.
    // Lo añadimos con alineación 'left' para que aparezca en el lado izquierdo.
    // El 'rank' determina el orden si hay múltiples elementos a la izquierda (valores bajos van primero).
    statusBar.registerStatusItem(
      plugin.id + ':wom-status', // Un ID único para este item en la barra de estado
      {
        item: bannerWidget,
        align: 'left', // Alinea el item a la izquierda de la barra de estado
        rank: 10,      // Posición relativa a otros items de la izquierda (puedes ajustar esto)
        isActive: () => true // Siempre activo (puedes hacerlo condicional si lo necesitas)
      }
    );

    console.log('WOM banner added to the status bar.');
  }
};

export default plugin;