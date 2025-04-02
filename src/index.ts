import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IStatusBar, ReactWidget } from '@jupyterlab/statusbar';
import React from 'react';

/**
 * Un componente React simple para el contenido del banner.
 */
const BannerComponent = (): JSX.Element => {
  // El div principal ahora usa la clase CSS definida en style/base.css
  // Ya no necesita 'position: fixed' porque la barra de estado lo maneja.
  return (
    <div className="jp-bottom-banner" id="jp-bottom-banner-id">
      Este es el banner inferior! (vía StatusBar)
    </div>
  );
};

/**
 * Un Widget de Lumino (usando React) que envuelve nuestro componente de banner.
 */
class BannerWidget extends ReactWidget {
  /**
   * Construye un nuevo widget de banner.
   */
  constructor() {
    super();
    // Puedes añadir clases CSS adicionales al propio widget si es necesario
    this.addClass('jp-BottomBannerWidget');
  }

  /**
   * Renderiza el componente BannerComponent dentro de este widget.
   */
  render(): JSX.Element {
    return <BannerComponent />;
  }
}


/**
 * El plugin de extensión de JupyterLab.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-bottom-banner:plugin',
  autoStart: true,
  // Ahora requerimos IStatusBar en lugar de (o además de) ILabShell
  requires: [IStatusBar],
  activate: (
    app: JupyterFrontEnd,
    statusBar: IStatusBar // Recibimos la instancia de IStatusBar
  ) => {
    console.log('JupyterLab extension jupyterlab-bottom-banner is activating!');

    // 1. Crear una instancia de nuestro BannerWidget
    const widget = new BannerWidget();

    // 2. Registrar el widget en la barra de estado
    // - El primer argumento es un ID único para este item en la barra de estado.
    // - `item`: Es la instancia del widget que creamos.
    // - `align`: 'left', 'right', o 'middle'. Pongámoslo a la izquierda.
    // - `rank`: Controla el orden relativo a otros items en la misma alineación.
    //          Rank más bajo va más a la izquierda (en align: 'left').
    //          Rank más bajo va más a la derecha (en align: 'right').
    statusBar.registerStatusItem(
      'jupyterlab-bottom-banner:status-item', // ID único
      {
        item: widget,
        align: 'left', // Podría ser 'right' si lo prefieres al otro lado
        rank: 1000 // Un rank alto en 'left' lo empuja hacia la derecha de esa sección
                   // Un rank bajo (e.g., 0) lo pondría muy a la izquierda.
                   // Experimenta para encontrar la posición deseada.
      }
    );

    console.log('Banner widget added to the status bar.');

    // Ya no necesitamos añadir nada manualmente a app.shell.node
    // El código original que hacía app.shell.node.appendChild(banner) se elimina.
  }
};

export default plugin;
