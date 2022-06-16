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
import { RolesService } from '../roles.service';

@Component({
  selector: 'multi-select-tree',
  templateUrl: './tree-multi-selection.component.html',
  providers: [TreeDragDropService],
})
export class TreeMultiSelectionForThePerComponent implements OnInit {
  dataTree: TreeNode[];
  idRole: any;
  nameRole: any;
  constructor(
    private treeService: treeService,
    public service: RolesService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetDataById();
  }

  GetDataById() {
    this.service.per$.subscribe((Data) => {
      this.service.selectedFile = [];
      if (Data) {
        this.dataTree = this.treeService.mapTree(Data.data);
        this.idRole = Data.role?.ID;
        this.nameRole = Data.role?.Name;
        this.findItemSelectedViewInMenu();
      }
      this.cdr.detectChanges();
    });
  }
  nodeSelect() {
    this.EditPerRole();
  }
  nodeUnselect() {
    this.EditPerRole();
  }
  EditPerRole() {
    this.service
      .AddRoleOrSaveNewPerORDelete({
        permissionID: this.service.selectedFile
          .map((value) => value.ID)
          .join(','),
        RoleID: this.idRole,
        RoleName: this.nameRole,
      })
      .pipe(
        map((value) => {
          return value.toString().split('|');
        })
      )
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
        this.service.selectedFile.push(element);
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
  finditemSelectedByID(ID: any) {
    const searchTree = (element: any, ID: any) => {
      if (element.ID == ID) {
        this.service.selectedFile.push(element);
      } else if (element.children != null) {
        var i;
        var result: any = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          searchTree(element.children[i], ID);
        }
      }
    };
    if (this.dataTree.length > 0) {
      this.dataTree.forEach((value) => {
        searchTree(value, ID);
      });
    }
  }
  // nodeUnselect(event: any) {}
}
