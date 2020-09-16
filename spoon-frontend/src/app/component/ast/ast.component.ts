import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

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
  @ViewChild('code')
  private code: ElementRef;

  @ViewChild('tree')
  private tree: ElementRef;

  readonly treeControl: NestedTreeControl<ASTNode>;

  readonly dataSource: MatTreeNestedDataSource<ASTNode>;

  hasChild = (_: number, node: ASTNode) => node.children !== undefined && node.children.length > 0;


  constructor(private http: HttpClient) {
    this.treeControl = new NestedTreeControl<ASTNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = testData;
  }

  ngAfterViewInit(): void {
  }
}
