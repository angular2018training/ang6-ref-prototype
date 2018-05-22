import { Component, OnInit, Inject, HostBinding, Input, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./common.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class EditableInputComponent implements OnInit {
  @ViewChild("textInput") textInput: ElementRef;
  isEdit = false;
  tmpText: string = '';
  @Input() text: string;
  @Input() classInput: any;
  @Input() maxlength: number;
  @Output() callback: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() { }
  constructor(private _eref: ElementRef) { }

  editText() {
    this.tmpText = this.text;
    this.isEdit = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  acceptTextChanged() {
    this.text = this.tmpText;
    this.isEdit = false;

    if (this.callback) {
      this.callback.emit(this.text);
    }
  }

  cancelTextChanged() {
    this.isEdit = false;
  }

  onClickInput($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) { // click outside current element
      if (this.text !== this.tmpText && this.tmpText !== '') {
        this.acceptTextChanged();
      } else {
        this.cancelTextChanged();
      }
    } else {
      this.editText();
    }
  }
}