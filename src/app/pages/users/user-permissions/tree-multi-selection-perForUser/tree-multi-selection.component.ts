import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { treeService } from 'src/app/services/tree.service';
import { UserPermissionsService } from '../../services/user-permissions.service';

@Component({
  selector: 'multi-select-tree',
  templateUrl: './tree-multi-selection.component.html',
  providers: [TreeDragDropService],
})
export class TreeMultiSelectionForUserPerComponent implements OnInit {
  dataTree: TreeNode[];
  selectedFile: any[];
  userId: any;
  nameRole: any;
  constructor(
    private treeService: treeService,
    public service: UserPermissionsService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetDataById();
  }

  GetDataById() {
    this.service.userPer$.subscribe((Data) => {
      this.selectedFile = [];
      if (Data.data) {
        this.dataTree = this.treeService.mapTree(Data.data);
        this.userId = Data.userID;
        console.log('this.dataTree', this.dataTree);
        this.findItemSelectedViewInMenu();
      }
      this.cdr.detectChanges();
    });
  }
  nodeSelect() {
    this.savePreForUser();
  }
  nodeUnselect() {
    this.savePreForUser();
  }
  savePreForUser() {
    this.service
      .saveNewPerForUser({
        permissions: this.selectedFile.map((value) => value.ID).join(','),
        userId: this.userId,
      })

      .subscribe(
        (res: any) => {
          this.toastr.success(res[1]);
        },
        (err) => {
          this.toastr.error('خطا غير معروف');
        }
      );
  }
  findItemSelectedViewInMenu() {
    const searchTree = (element: any) => {
      if (element.data.isChecked == true) {
        this.selectedFile.push(element);
      }
      if (element.children != null) {
        var i;
        var result: any = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          searchTree(element.children[i]);
        }
      }
    };
    if (this.dataTree.length > 0) {
      this.dataTree.forEach((value) => {
        searchTree(value);
      });
    }
  }
}
