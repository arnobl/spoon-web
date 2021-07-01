import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Bindings, PartialTextInputBinder} from 'interacto';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {HttpClient} from '@angular/common/http';
import {UpdateCode} from '../../command/update-code';

export interface ASTNode {
  label: string;
  children?: ASTNode[];
}

const testData: ASTNode[] = [
  {
    label: 'Fruit',
    children: [
      {label: 'Apple'},
      {label: 'Banana'},
      {label: 'Fruit loops'},
    ]
  }, {
    label: 'Vegetables',
    children: [
      {
        label: 'Green',
        children: [
          {label: 'Broccoli'},
          {label: 'Brussels sprouts'},
        ]
      }, {
        label: 'Orange',
        children: [
          {label: 'Pumpkins'},
          {label: 'Carrots'},
        ]
      },
    ]
  },
];


@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements AfterViewInit {
  @ViewChild('tree')
  private tree: ElementRef<MatTree<any>>;

  readonly treeControl: NestedTreeControl<ASTNode>;

  readonly dataSource: MatTreeNestedDataSource<ASTNode>;

  hasChild = (_: number, node: ASTNode) => node.children !== undefined && node.children.length > 0;


  constructor(private http: HttpClient, public bindings: Bindings) {
    this.treeControl = new NestedTreeControl<ASTNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource();
    // this.dataSource.data = testData;
  }

  configureCodeChange(binding: PartialTextInputBinder): void {
    binding
      .toProduce(() => new UpdateCode(this.http, this.dataSource))
      .then((c, i) => {
        c.code = i.widget.value;
      })
      .bind();
  }

  ngAfterViewInit(): void {
  }
}
