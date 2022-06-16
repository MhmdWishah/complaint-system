import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PemissionsService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private authHttpService: AuthHTTPService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    // private toastr: ToastrService,

  ){}
  get currentUserPermissions() {
    return this.http
      .get(`${environment.baseUrl}/user/permissions`, {
        headers: this.authService.getHeaders(),
      })
      .pipe(
        map((res: any) => {
          const tree = this.mapPermissions(res);
          console.log("tree:",tree)
          return tree;
        })
      );
  }

  private mapPermissions(permissions: any[]): any[] {
    const checkChildren = (tree: any[], role: any) => {
      tree.forEach((treeNode) => {
        if (treeNode.id == role.Parent) {
           treeNode.submenu.push(this.createMenuItem(role,true));
        } else if (treeNode.submenu && treeNode.submenu.length > 0) {
          checkChildren(treeNode.submenu, role);
        }
      });
    };

    let tree: any[] = [];
    permissions.forEach((item) => {

      if (!item.Parent || item.Parent == "#") {
        tree.push(this.createMenuItem(item));
      } else {
        checkChildren(tree, item);
      }
    });

    this.treeLoop(tree, (item: any) => {
      if (item?.submenu?.length <= 0) {
        delete item.submenu;
      }
      // if (!item?.page)
      //     delete item.page;
    });
    return tree;
  }

  private createMenuItem(item: any,isAny?:boolean) {
    const isParent = item.Parent == null;
    if (isParent||isAny)
      return {
        id: item.Seq,
        title:
          localStorage.getItem("lang") == "en"
            ? item.Description
            : item.Description_ar,
        icon: item.Icon || "",
        page: item.Url,
        alignment: "left",
        root: true,
        toggle: "click",
        submenu: [],
      };
    else
      return {
        id: item.Seq,
        title:
          localStorage.getItem("lang") == "en"
            ? item.Description
            : item.Description_ar,
        icon: item.Icon || "",
        page: item.Url,
      };
  }

  private treeLoop(tree: any[], visit: Function) {
    tree.forEach((treeNode) => {
      visit(treeNode);
      if (treeNode.submenu && treeNode.submenu.length > 0)
        this.treeLoop(treeNode.submenu, visit);
    });
  }
}
