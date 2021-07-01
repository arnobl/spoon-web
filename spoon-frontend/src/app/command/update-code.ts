import {HttpClient} from '@angular/common/http';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ASTNode} from '../component/ast/ast.component';
import {CommandBase} from 'interacto';

export class UpdateCode extends CommandBase {
  constructor(private readonly http: HttpClient, private readonly dataSource: MatTreeNestedDataSource<ASTNode>) {
    super();
  }

  code: string;

  protected execution(): void {
    this.http
      .post('spoon/ast', {
        code: this.code,
        level: 'a'
      })
      .subscribe((ast: ASTNode) => {
        this.dataSource.data = [ast];
      });
  }
}
