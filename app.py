import os
import flask
import flask_socketio
import flask_sqlalchemy
import requests


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
#num_of_users = []
import model



@app.route('/')
def hello():
    
#    messages = model.Message.query.all()
#    html = ['<li>' + m.text + '</li>' for m in messages]
#    return '<ul>' + ''.join(html) + '</ul>'

    return flask.render_template('index.html')
all_numbers = []




num_of_users = []
@socketio.on('connect')
def on_connect():
    messages = model.Message.query.all()
    dat = []
    for m in messages:
        dat.append(m.text)
    dat.append("BOT: new user connected")
    socketio.emit('messages', {'value':dat})
    print 'Someone connected!'
    
    num_of_users.append(0) #kept running into number not set errors and this was the only way i could fix it but its a bad fix!!!
    num_of_users[0] = num_of_users[0] + 1
    socketio.emit('num_users', {'num':num_of_users[0]})
    print("number of users: " + str(num_of_users[0]))
#    socketio.emit('all numbers', {
#    'numbers': all_numbers
#    })
    

@socketio.on('disconnect')
def on_disconnect():
    messages = model.Message.query.all()
    dat = []
    for m in messages:
        dat.append(m.text)
    dat.append("BOT: new user connected")
    socketio.emit('messages', {'value':dat})
    print 'Someone disconnected!'
    if(num_of_users.count > 0 ):
        if(num_of_users[0]>0):
            num_of_users[0] = num_of_users[0] - 1
            socketio.emit('num_users', {'num':num_of_users[0]})



@socketio.on('new number')
def on_new_number(data):
    response = requests.get(
    'https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
    json = response.json()

    all_numbers.append({
    'name': json['name'],
    'picture': json['picture']['data']['url'],
    'number': data['number']
    })
    
    all_numbers.append(data['number'])
    print(data['facebook_user_token'])
    socketio.emit('all numbers', {
        'numbers': all_numbers
    })
    
@socketio.on('message')
def message(data):
    print("message recived")
    response = requests.get(
    'https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
    json = response.json()
    
    if(data['value'].find("!!",0,2)>=0):
        print("found bot command")
    else:
        message = model.Message(json['name'] + ": " +data['value'])
        model.db.session.add(message)
        model.db.session.commit();
        messages = model.Message.query.all()
        dat = []
        for m in messages:
            dat.append(m.text)
        #print(messages)
        socketio.emit('messages', {'value':dat})
    
    
    
    
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

