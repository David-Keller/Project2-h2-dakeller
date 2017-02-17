import os
import flask
import flask_socketio
import flask_sqlalchemy


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

#import model


@app.route('/')
def hello():
    messages = model.Message.query.all()
    html = ['<li>' + m.text + '</li>' for m in messages]
    return '<ul>' + ''.join(html) + '</ul>'

#    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print 'Someone connected!'

@socketio.on('disconnect')
def on_disconnect():
    print 'Someone disconnected!'

all_numbers = []
@socketio.on('new number')
def on_new_number(data):
    all_numbers.append(data['number'])
    socketio.emit('all numbers', {
        'numbers': all_numbers
    })
test_list = []
@socketio.on('text')
def send_text(data):
    test_list.append(data['value'])
    socketio.emit('all test', {'tesxt': test_list})
    

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )

