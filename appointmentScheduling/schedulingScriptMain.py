import pika
import json

def process_message(ch, method, properties, body):
    message_data = json.loads(body.decode('utf-8'))

    # Your scheduling algorithm logic here
    print('Processing message:', message_data)

    # Acknowledge the message
    ch.basic_ack(delivery_tag=method.delivery_tag)

def main():
    #connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    #channel = connection.channel()

    #channel.queue_declare(queue='appointments')

    #channel.basic_consume(queue='appointments', on_message_callback=process_message)

    print('Waiting for messages. To exit press CTRL+C')
    #channel.start_consuming()

if __name__ == '__main__':
    main()
