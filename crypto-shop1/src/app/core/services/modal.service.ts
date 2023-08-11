import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {ModalWindowComponent} from "../../terminal-core/components/modal-window/modal-window.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponentRef: ComponentRef<ModalWindowComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {}

  open(message: string, type: 'info' | 'warning' | 'error'): void {
    // Create a component reference from the component
    const componentRef: any = this.componentFactoryResolver
      .resolveComponentFactory(ModalWindowComponent)
      .create(this.injector);

    componentRef.instance.message = message;
    componentRef.instance.type = type;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    this.modalComponentRef = componentRef; // keep track of the component
  }

  close(): void {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }
}
