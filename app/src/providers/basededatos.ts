import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class BasededatosService {

  //db: SQLiteObject = null;
  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient,
              public platform: Platform,
              private sqlite:SQLite,
            ) {
              if( this.platform.is('cordova') ){
                    platform.ready().then(()=>{
                          this.createDatabase();
                    });
              }


  }


  private createTables(){

      return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS mensajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,contenido TEXT,
        ms TEXT, id_msj INTEGER ,
        boton_respuesta TEXT ,
        fecha DATE ,
        leido INTEGER);`,{} )
    .catch((err)=>console.log("error detected creating tables", err));
  }

  setDatabase(db: SQLiteObject){
      if(this.database === null){
        this.database = db;
      }
  }


  private isReady(){
    return new Promise((resolve, reject) =>{
      //if dbReady is true, resolve
      if(this.dbReady.getValue()){
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){
            console.log("ready database");
            resolve();
          }
        });
      }
    })
  }

  createDatabase(){
    this.sqlite.create({
      name: 'mensajes.db',
      location: 'default'
    })
    .then((db:SQLiteObject)=>{
      this.database = db;

      this.createTables().then(()=>{
        //communicate we are ready!
        this.dbReady.next(true);
      });
    })
  }

  getMensajes(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from mensajes", [])
      .then((data)=>{
        let mensajes = [];
        for(let i=0; i<data.rows.length; i++){
          mensajes.push(data.rows.item(i));
        }
        return mensajes;
      })
    }).catch(error => Promise.reject(error));
  }



  addMensaje(msj:datos_push){

    return this.isReady()
    .then(()=>{
        let id_msj = msj.id_msj.toString();
      return this.database.executeSql(`INSERT INTO mensajes(titulo,contenido , ms, id_msj, boton_respuesta , fecha, leido) VALUES ('${msj.titulo}','${msj.contenido}','${msj.ms}','${id_msj}','${msj.boton_respuesta}','${msj.fecha}','${msj.leido}');`, {}).then((result)=>{
        if(result.insertId){
          console.log(" add ",result);
          return this.getMensaje(result.insertId);
        }
      })
    });
  }

  updateMensaje(msj:datos_push){
    return this.isReady()
    .then(()=>{
        let sql = 'UPDATE mensajes SET titulo=?,contenido=? , ms=?, id_msj=?, boton_respuesta=? , fecha=?, leido=? WHERE id_msj=?';
        let id_msj = msj.id_msj.toString();
        console.log("update, ",id_msj);
        return this.database.executeSql(sql, [msj.titulo, msj.contenido ,msj.ms, id_msj, msj.boton_respuesta , msj.fecha, msj.leido, id_msj]).then((result)=>{
            if(result.insertId){
              console.log(" update ",result);
              return this.getMensaje(result.insertId);
            }
      })
    });
  }



  getMensaje(id){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM mensajes WHERE id = ${id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  deleteMensaje(id){
    return this.isReady()
    .then(()=>{
      console.log(" borrar id ",id);
      return this.database.executeSql(`DELETE FROM mensajes WHERE id = ${id}`, []);
    })
  }


  getTodosFromMensaje(listId:number){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * from mensajes WHERE leido = ${listId}`, [])
            .then((data)=>{
              let todos = [];
              for(let i=0; i<data.rows.length; i++){
                let todo = data.rows.item(i);
                //cast binary numbers back to booleans
                todo.isImportant = !!todo.isImportant;
                todo.isDone = !!todo.isDone;
                todos.push(todo);
              }
              return todos;
            })
    })
  }

  /*

  addTodo(description:string, isImportant:boolean, isDone:boolean, listId:number){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO todo
        (description, isImportant, isDone, listId) VALUES (?, ?, ?, ?);`,
        //cast booleans to binary numbers
        [description, isImportant?1:0, isDone?1:0, listId]);
    });
  }

  modifyTodo(description:string, isImportant:boolean, isDone:boolean, id:number){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`UPDATE todo
        SET description = ?,
            isImportant = ?,
            isDone = ?
        WHERE id = ?`,
        //cast booleans to binary numbers
        [description, isImportant?1:0, isDone?1:0, id]);
    });
  }

  removeTodo(id:number){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`DELETE FROM todo WHERE id = ${id}`, [])
    })
  }




  update(msj: datos_push){
      let sql = 'UPDATE mensajes SET titulo=?,contenido=? , ms=?, id_msj=?, boton_respuesta=? , fecha=?, leido=? WHERE id_msj=?';
      return this.db.executeSql(sql, [msj.titulo, msj.contenido ,msj.ms, msj.id_msj, msj.boton_respuesta , msj.fecha, msj.leido, msj.id_msj]);
  }

  delete(msj: datos_push){
      let sql = 'DELETE FROM mensajes WHERE id_msj=?';
      return this.db.executeSql(sql, [msj.id_msj]);
  }

*/



}

// just an interface for type safety.
interface datos_push {

  titulo : string,
  contenido : string,
  ms : string,
  id_msj : number,
  boton_respuesta : string,
  fecha: string;
  leido: number;
}
