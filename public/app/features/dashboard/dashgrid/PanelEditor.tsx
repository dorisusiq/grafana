import React from 'react';
import { PanelModel } from '../panel_model';
import { DashboardModel } from '../dashboard_model';
import { getAngularLoader, AngularComponent } from 'app/core/services/angular_loader';

interface PanelEditorProps {
  panel: PanelModel;
  dashboard: DashboardModel;
}

export class PanelEditor extends React.Component<PanelEditorProps, any> {
  queryElement: any;
  queryComp: AngularComponent;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.queryElement) {
      return;
    }

    let loader = getAngularLoader();
    var template = '<plugin-component type="query-ctrl" />';
    let scopeProps = {
      ctrl: {
        panel: this.props.panel,
        dashboard: this.props.dashboard,
        panelCtrl: {
          panel: this.props.panel,
          dashboard: this.props.dashboard,
        },
      },
      target: {},
    };

    this.queryComp = loader.load(this.queryElement, scopeProps, template);
  }

  render() {
    return (
      <div className="tabbed-view tabbed-view--panel-edit-new">
        <div className="tabbed-view-header">
          <ul className="gf-tabs">
            <li className="gf-tabs-item">
              <a className="gf-tabs-link active">Queries</a>
            </li>
            <li className="gf-tabs-item">
              <a className="gf-tabs-link">Visualization</a>
            </li>
          </ul>

          <button className="tabbed-view-close-btn" ng-click="ctrl.exitFullscreen();">
            <i className="fa fa-remove" />
          </button>
        </div>

        <div className="tabbed-view-body">
          <div ref={element => (this.queryElement = element)} className="panel-height-helper" />
        </div>
      </div>
    );
  }
}