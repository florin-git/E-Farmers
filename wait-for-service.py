from time import sleep
import socket
import sys
import getopt
import os

'''
wait-for-service.py
Script that waits for a service to be online.

Usage:
    python wait-for-service.py [OPTIONS] [HOSTNAME] [PORT]

    OPTIONS:
        -d, --postgres-db               The service to be checked for availability is a postgresql database. 
                                        If this option is used then the arguments: 
                                            --postgres-db-name --postgres-db-user --postgres-db-password
                                        must be provided as well.
        -n, --postgres-db-name          The name of the postgresql database to connect to.
        -u, --postgres-db-user          The user used to connect to the postgresql database.
        -p, --postgres-db-password      The password of the user used to connect to the postgresql database.
'''

def usage():
    with open('./wait-for-service-usage.txt', 'r') as f:
        print(f.read())

def isUp(service_args):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect((service_args['host'], int(service_args['port'])))
        s.close()
        return True
    except:
        return False

def isPostgresUp(db_args):
    import psycopg2
    try:
        psycopg2.connect(database=db_args['db_name'], user=db_args['db_user'], password=db_args['db_password'], host=db_args['host'], port=db_args['port'])
        return True
    except psycopg2.Error as e:
        return False

def main():
    try:
        optlist, args = getopt.getopt(sys.argv[1:], 'hdn:u:p:', ['help', 'postgres-db-name=', 'postgres-db-user=', 'postgres-db-password='])
    except getopt.GetoptError as err:
        print(err)
        usage()
        sys.exit(2)
    
    service_args = {}
    is_a_postgres_db = False

    if len(optlist) > 0:
        if optlist[0][0] in ("-h", "--help"):
            os.system('cls' if os.name == 'nt' else 'clear')
            usage()
            sys.exit(0)
        if optlist[0][0] == '-d':
            if len(optlist[1:]) != 3:
                print("Provide all the arguments needed to connect to a postgresql database (--help for reference)")
                sys.exit(2)
            is_a_postgres_db = True
            for o, a in optlist[1:]:
                if o in ("-n", "--postgres-db-name"):
                    service_args['db_name'] = a
                elif o in ("-u", "--postgres-db-user"):
                    service_args['db_user'] = a
                elif o in ("-p", "--postgres-db-password"):
                    service_args['db_password'] = a
                else:
                    assert False, f'unhandled option {o}'
    
    if len(args) != 2:
        print("Provide hostname and port")
        sys.exit(2)
    service_args['host'] = args[0]
    service_args['port'] = args[1]

    while True:
        if is_a_postgres_db:
            if isPostgresUp(service_args): sys.exit(0)
        else:
            if isUp(service_args): sys.exit(0)
        print('Service ' + service_args['host'] + ' is not available, sleeping...')
        sleep(2)

if __name__ == "__main__":
    main()